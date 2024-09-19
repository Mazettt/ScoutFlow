using System;
using System.ComponentModel.DataAnnotations;

namespace ScoutFlowAPI.Models;

public class LoginRequest
{
    [Required]
    public string IdToken { get; set; } = null!;
}
