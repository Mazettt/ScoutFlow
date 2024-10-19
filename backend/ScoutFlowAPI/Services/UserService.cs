using System;
using FirebaseAdmin.Auth;
using Microsoft.EntityFrameworkCore;
using ScoutFlowAPI.Data;
using ScoutFlowAPI.Models;

namespace ScoutFlowAPI.Services;

public class UserService(ScoutFlowContext context)
{
    private readonly ScoutFlowContext _context = context;

    public async Task<IEnumerable<User>> GetUsers(bool verifed = true)
    {
        var enumerator = FirebaseAuth.DefaultInstance.ListUsersAsync(null).GetAsyncEnumerator();
        List<UserRecord> firebaseUsers = [];
        while (await enumerator.MoveNextAsync())
        {
            firebaseUsers.Add(enumerator.Current);
        }
        var userMetadatas = await _context.UserMetadata
            .Where(u => u.Verified == verifed)
            .Include(u => u.Roles)
            .Include(u => u.Units)
            .Include(u => u.Locals)
            .Include(u => u.Events)
            .ToListAsync();

        return userMetadatas.Select(u =>
            {
                UserRecord fu = firebaseUsers.Single(x => x.Uid == u.FirebaseId);
                return new User(fu, u);
            })
            .Where(u => u.Disabled == false).ToList();
    }

    // public async Task<IEnumerable<UserRecord>> GetUsers(int page, int pageSize)
    // {
    // }

    public async Task<User> GetUserById(string uid)
    {
        UserRecord fu = await FirebaseAuth.DefaultInstance.GetUserAsync(uid);
        UserMetadatum u = await _context.UserMetadata
            .Include(u => u.Roles)
            .Include(u => u.Units)
            .Include(u => u.Locals)
            .Include(u => u.Events)
            .SingleAsync(u => u.FirebaseId == uid);
        return new User(fu, u);
    }

    public async Task<UserRecord> CreateUser(UserRecordArgs user, List<string> roles, List<string> units)
    {
        UserMetadatum newUser = new();
        foreach (string role in roles)
        {
            try
            {
                Role dbRole = await _context.Roles.SingleAsync(r => r.Name == role);
                newUser.Roles.Add(dbRole);
            }
            catch (InvalidOperationException)
            {
                throw new ArgumentException("Le role " + role + " n'existe pas");
            }
        }
        foreach (string unit in units)
        {
            try
            {
                Unit dbUnit = await _context.Units.SingleAsync(u => u.Name == unit);
                newUser.Units.Add(dbUnit);
            }
            catch (InvalidOperationException)
            {
                throw new ArgumentException("L'unité " + unit + " n'existe pas");
            }
        }
        UserRecord ret = await FirebaseAuth.DefaultInstance.CreateUserAsync(user);
        await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(ret.Uid, new Dictionary<string, object> { { "Verified", false } });
        newUser.FirebaseId = ret.Uid;
        newUser.Verified = false;
        await _context.UserMetadata.AddAsync(newUser);
        await _context.SaveChangesAsync();

        return ret;
    }

    public async Task<UserRecord> UpdateUser(UserRecordArgs user)
    {
        return await FirebaseAuth.DefaultInstance.UpdateUserAsync(user);
    }

    public async Task DisableUser(string uid)
    {
        await FirebaseAuth.DefaultInstance.UpdateUserAsync(new UserRecordArgs { Uid = uid, Disabled = true });
    }

    public async Task<bool> IsUserPending(string uid)
    {
        return await _context.UserMetadata.AnyAsync(u => u.FirebaseId == uid && u.Verified == false);
    }

    public async Task AcceptPendingUser(string uid)
    {
        UserRecord fu = await FirebaseAuth.DefaultInstance.GetUserAsync(uid);
        UserMetadatum u = await _context.UserMetadata.Include(u => u.Roles).Include(u => u.Units).SingleAsync(u => u.FirebaseId == uid);
        u.Verified = true;
        _context.UserMetadata.Update(u);
        await _context.SaveChangesAsync();

        Dictionary<string, object> claims = [];
        claims.Add("Verified", true);
        foreach (Role role in u.Roles)
        {
            claims.Add(role.Name, true);
        }
        foreach (Unit unit in u.Units)
        {
            claims.Add(unit.Name, true);
        }
        await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(fu.Uid, claims);
    }

    public async Task DeletePendingUser(string uid)
    {
        await FirebaseAuth.DefaultInstance.DeleteUserAsync(uid);
        UserMetadatum u = await _context.UserMetadata.Include(u => u.Roles).Include(u => u.Units).SingleAsync(u => u.FirebaseId == uid);
        u.Roles.Clear();
        u.Units.Clear();
        _context.UserMetadata.Remove(u);
        await _context.SaveChangesAsync();
    }
}
