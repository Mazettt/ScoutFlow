// using FirebaseAdmin.Auth;
// using Microsoft.EntityFrameworkCore;
// using ScoutFlowAPI.Data;
// using ScoutFlowAPI.Models;

// namespace ScoutFlowAPI.Services;

// public class UserDbService(ScoutFlowContext context)
// {
//     private readonly ScoutFlowContext _context = context;

//     public async Task<IEnumerable<User>> GetUsers()
//     {
//         return await _context.Users.Include(u => u.Roles).ToListAsync();
//     }

//     public async Task<IEnumerable<User>> GetUsers(int page, int pageSize)
//     {
//         return await _context.Users.Include(u => u.Roles).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
//     }

//     public async Task<User?> GetUserById(int id)
//     {
//         try
//         {
//             return await _context.Users.Include(u => u.Roles).SingleAsync(u => u.Id == id);
//         }
//         catch (InvalidOperationException)
//         {
//             return null;
//         }
//     }

//     public async Task<User?> GetUserByEmail(string email)
//     {
//         try
//         {
//             return await _context.Users.Include(u => u.Roles).SingleAsync(u => u.Email == email);
//         }
//         catch (InvalidOperationException)
//         {
//             return null;
//         }
//     }

//     public async Task<User?> CreateUser(User user)
//     {
//         user.CreatedAt = null;
//         user.UpdatedAt = null;
//         var memberRole = await _context.Roles.SingleAsync(r => r.Name == "Membre");
//         user.Roles.Add(memberRole);
//         try
//         {
//             UserRecordArgs args = new()
//             {
//                 Email = user.Email,
//                 EmailVerified = false,
//                 Password = user.Password,
//                 DisplayName = $"{user.Firstname} {user.Lastname}",
//                 Disabled = false,
//             };
//             UserRecord userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(args);

//             var res = await _context.Users.AddAsync(user);
//             await _context.SaveChangesAsync();
//             return res.Entity;
//         }
//         catch (DbUpdateException)
//         {
//             return null;
//         }
//     }

//     public async Task<User?> UpdateUser(User user)
//     {
//         user.CreatedAt = null;
//         user.UpdatedAt = DateTime.Now;
//         try
//         {
//             var res = _context.Users.Update(user);
//             await _context.SaveChangesAsync();
//             return res.Entity;
//         }
//         catch (DbUpdateException)
//         {
//             return null;
//         }
//     }

//     public async Task<bool> DeleteUser(int id)
//     {
//         try
//         {
//             var user = await _context.Users.SingleAsync(u => u.Id == id);
//             _context.Users.Remove(user);
//             await _context.SaveChangesAsync();
//             return true;
//         }
//         catch (InvalidOperationException)
//         {
//             return false;
//         }
//         catch (DbUpdateException)
//         {
//             return false;
//         }
//     }
// }
