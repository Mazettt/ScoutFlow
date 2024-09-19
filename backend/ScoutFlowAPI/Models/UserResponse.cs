using System;
using FirebaseAdmin.Auth;

namespace ScoutFlowAPI.Models;

public class UserResponse(UserRecord user)
{
    public string Id { get; set; } = user.Uid;
    public string DisplayName { get; set; } = user.DisplayName;
    public string Email { get; set; } = user.Email;
    public string PhoneNumber { get; set; } = user.PhoneNumber;
}
