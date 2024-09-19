using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScoutFlowAPI.Models;
using ScoutFlowAPI.Services;

namespace ScoutFlowAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(ILogger<AuthController> logger, UserService service) : ControllerBase
{
    private readonly ILogger<AuthController> _logger = logger;
    private readonly UserService _service = service;

    // [HttpPost("register", Name = "Register")]
    // [ProducesResponseType<UserResponse>(StatusCodes.Status200OK)]
    // [ProducesResponseType<ErrorResponse>(StatusCodes.Status400BadRequest)]
    // public async Task<IActionResult> Register(RegisterRequest registerReq)
    // {
    //     try
    //     {
    //         UserRecord createdUser = await _service.CreateUser(registerReq.ToUser());
    //         string customToken = await FirebaseAuth.DefaultInstance.CreateCustomTokenAsync(createdUser.Uid);
    //         return Ok(new RegisterResponse(customToken));
    //     }
    //     catch (FirebaseAuthException e)
    //     {
    //         if (e.AuthErrorCode == AuthErrorCode.EmailAlreadyExists)
    //         {
    //             return BadRequest(new ErrorResponse("L'adresse email est déjà utilisée, veuillez en choisir une autre"));
    //         }
    //         return BadRequest(new ErrorResponse("Impossible de créer l'utilisateur", e.Message));
    //     }
    // }

    [HttpGet("profile", Name = "Profile")]
    [ProducesResponseType<UserRecord>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Profile()
    {
        var sessionCookie = Request.Cookies["session"];
        if (string.IsNullOrEmpty(sessionCookie))
        {
            return Unauthorized(new ErrorResponse("Session invalide", "Aucun cookie de session"));
        }
        try
        {
            var decodedToken = await FirebaseAuth.DefaultInstance.VerifySessionCookieAsync(sessionCookie, true);
            UserRecord user = await FirebaseAuth.DefaultInstance.GetUserAsync(decodedToken.Uid);
            return Ok(user);
        }
        catch (FirebaseAuthException)
        {
            return Unauthorized(new ErrorResponse("Session invalide", "Cookie de session invalide"));
        }
    }

    [HttpPost("login", Name = "Login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Login(LoginRequest loginReq)
    {
        SessionCookieOptions options = new()
        {
            ExpiresIn = TimeSpan.FromDays(5),
        };
        try
        {
            var sessionCookie = await FirebaseAuth.DefaultInstance.CreateSessionCookieAsync(loginReq.IdToken, options);
            var cookieOptions = new CookieOptions()
            {
                Expires = DateTimeOffset.UtcNow.Add(options.ExpiresIn),
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
            };
            Response.Cookies.Append("session", sessionCookie, cookieOptions);
            return Ok();
        }
        catch (FirebaseAuthException)
        {
            return Unauthorized(new ErrorResponse("Identifiants invalides"));
        }
    }

    [HttpPost("logout", Name = "Logout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("session");
        return Ok();
    }

    [HttpPost("logout/all", Name = "LogoutAll")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> LogoutAll()
    {
        var sessionCookie = Request.Cookies["session"];
        try
        {
            var decodedToken = await FirebaseAuth.DefaultInstance.VerifySessionCookieAsync(sessionCookie);
            await FirebaseAuth.DefaultInstance.RevokeRefreshTokensAsync(decodedToken.Uid);
            Response.Cookies.Delete("session");
            return Ok();
        }
        catch (FirebaseAuthException)
        {
            return Ok();
        }
    }
}
