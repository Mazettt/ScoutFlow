using System;
using FirebaseAdmin.Auth;

namespace ScoutFlowAPI.Models;

public class User(UserRecord firebaseUser, UserMetadatum userMetadata)
{
    public string Uid { get; } = firebaseUser.Uid;
    public string DisplayName { get; } = firebaseUser.DisplayName;
    public string Email { get; } = firebaseUser.Email;
    public string PhoneNumber { get; } = firebaseUser.PhoneNumber;
    public string PhotoUrl { get; } = firebaseUser.PhotoUrl;
    public string ProviderId => "firebase";
    public bool EmailVerified { get; } = firebaseUser.EmailVerified;
    public bool Disabled { get; } = firebaseUser.Disabled;
    public UserMetadata UserMetaData { get; } = firebaseUser.UserMetaData;
    public IReadOnlyDictionary<string, object> CustomClaims { get; } = firebaseUser.CustomClaims;

    public bool Verified { get; set; } = userMetadata.Verified;
    public virtual ICollection<Role> Roles { get; set; } = userMetadata.Roles;
    public virtual ICollection<Unit> Units { get; set; } = userMetadata.Units;
    public virtual ICollection<Event> Events { get; set; } = userMetadata.Events;
    public virtual ICollection<Local> Locals { get; set; } = userMetadata.Locals;
}