using System;
using System.ComponentModel.DataAnnotations;
using FirebaseAdmin.Auth;

namespace ScoutFlowAPI.Models;

public class RegisterRequest: UserRequest
{
    [Required]
    public List<string> Roles { get; set; } = null!;
    [Required]
    public List<string> Units { get; set; } = null!;
}
