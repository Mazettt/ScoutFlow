using System;
using FirebaseAdmin.Auth;

namespace ScoutFlowAPI.Models;

public class PendingUserResponse(User user)
{
    public string Id { get; set; } = user.Uid;
    public string DisplayName { get; set; } = user.DisplayName;
    public string Email { get; set; } = user.Email;
    public string PhoneNumber { get; set; } = user.PhoneNumber;
    public DateTime? CreatedAt { get; set; } = user.UserMetaData.CreationTimestamp;
    public List<string> Roles { get; set; } = user.Roles.Select(r => r.Name).ToList();
    public List<string> Units { get; set; } = user.Units.Select(u => u.Name).ToList();
}
