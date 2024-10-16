using System;
using FirebaseAdmin.Auth;

namespace ScoutFlowAPI.Models;

public class UserResponse
{
    public UserResponse(User user)
    {
        Id = user.Uid;
        DisplayName = user.DisplayName;
        Email = user.Email;
        PhoneNumber = user.PhoneNumber;
        CreatedAt = user.UserMetaData.CreationTimestamp;
    }

    public UserResponse(UserRecord firebaseUser)
    {
        Id = firebaseUser.Uid;
        DisplayName = firebaseUser.DisplayName;
        Email = firebaseUser.Email;
        PhoneNumber = firebaseUser.PhoneNumber;
        CreatedAt = firebaseUser.UserMetaData.CreationTimestamp;
    }

    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime? CreatedAt { get; set; }
}
