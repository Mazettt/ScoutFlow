using System;
using System.ComponentModel.DataAnnotations;
using FirebaseAdmin.Auth;

namespace ScoutFlowAPI.Models;

public class UserRequest
{
    [Required]
    public string Firstname { get; set; } = null!;
    [Required]
    public string Lastname { get; set; } = null!;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;
    [Required]
    [Phone]
    public string PhoneNumber { get; set; } = null!;
    [Required]
    [MinLength(8)]
    public string Password { get; set; } = null!;

    public UserRecordArgs ToUser()
    {
        return new UserRecordArgs
        {
            Email = Email,
            DisplayName = $"{Firstname} {Lastname}",
            Password = Password,
            PhoneNumber = PhoneNumber
        };
    }
}
