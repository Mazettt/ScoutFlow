using System;
using FirebaseAdmin.Auth;

namespace ScoutFlowAPI.Models;

public class ProfileResponse(User user)
{
    public string Uid { get; } = user.Uid;
    public string DisplayName { get; } = user.DisplayName;
    public string Email { get; } = user.Email;
    public string PhoneNumber { get; } = user.PhoneNumber;
    public string PhotoUrl { get; } = user.PhotoUrl;
    public string ProviderId => "firebase";
    public bool EmailVerified { get; } = user.EmailVerified;
    public bool Disabled { get; } = user.Disabled;
    public UserMetadata UserMetaData { get; } = user.UserMetaData;
    public IReadOnlyDictionary<string, object> CustomClaims { get; } = user.CustomClaims;

    public bool Verified { get; set; } = user.Verified;
    public List<string> Roles { get; set; } = user.Roles.Select(u => u.Name).ToList();
    public List<string> Units { get; set; } = user.Units.Select(u => u.Name).ToList();
    public List<string> Events { get; set; } = user.Events.Select(u => u.Name).ToList();
    public List<string> LocalsKey { get; set; } = user.LocalsKey.Select(u => u.Name).ToList();
}
