using System;
using FirebaseAdmin.Auth;
using Microsoft.EntityFrameworkCore;
using ScoutFlowAPI.Data;
using ScoutFlowAPI.Models;

namespace ScoutFlowAPI.Services;

public class UserService(ScoutFlowContext context)
{
    private readonly ScoutFlowContext _context = context;

    public async Task<IEnumerable<UserRecord>> GetUsers()
    {
        var enumerator = FirebaseAuth.DefaultInstance.ListUsersAsync(null).GetAsyncEnumerator();
        List<UserRecord> users = [];
        while (await enumerator.MoveNextAsync())
        {
            users.Add(enumerator.Current);
        }
        return users;
    }

    // public async Task<IEnumerable<UserRecord>> GetUsers(int page, int pageSize)
    // {
    // }

    public async Task<UserRecord> GetUserById(string uid)
    {
        return await FirebaseAuth.DefaultInstance.GetUserAsync(uid);
    }

    public async Task<UserRecord> CreateUser(UserRecordArgs user, List<string> roles, List<string> units)
    {

        PendingUser pendingUser = new();
        foreach (string role in roles)
        {
            try
            {
                var dbRole = await _context.Roles.SingleAsync(r => r.Name == role);
                pendingUser.Roles.Add(dbRole);
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
                var dbUnit = await _context.Units.SingleAsync(u => u.Name == unit);
                pendingUser.Units.Add(dbUnit);
            }
            catch (InvalidOperationException)
            {
                throw new ArgumentException("L'unité " + unit + " n'existe pas");
            }
        }
        var ret = await FirebaseAuth.DefaultInstance.CreateUserAsync(user);
        pendingUser.FirebaseId = ret.Uid;
        await _context.PendingUsers.AddAsync(pendingUser);
        await _context.SaveChangesAsync();

        return ret;
    }

    public async Task<UserRecord> UpdateUser(UserRecordArgs user)
    {
        return await FirebaseAuth.DefaultInstance.UpdateUserAsync(user);
    }

    public async Task DeleteUser(string uid)
    {
        await FirebaseAuth.DefaultInstance.DeleteUserAsync(uid);
    }
}
