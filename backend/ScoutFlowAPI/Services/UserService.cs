using System;
using FirebaseAdmin.Auth;
using ScoutFlowAPI.Data;

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

    public async Task<UserRecord> CreateUser(UserRecordArgs user)
    {
        return await FirebaseAuth.DefaultInstance.CreateUserAsync(user);
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
