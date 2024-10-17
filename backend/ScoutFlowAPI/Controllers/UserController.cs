using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Mvc;
using ScoutFlowAPI.Models;
using ScoutFlowAPI.Services;

namespace ScoutFlowAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(ILogger<UserController> logger, UserService service) : ControllerBase
{
    private readonly ILogger<UserController> _logger = logger;
    private readonly UserService _service = service;

    [HttpGet(Name = "GetUsers")]
    [ProducesResponseType<IEnumerable<UserResponse>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        return Ok((await _service.GetUsers()).Select(u => new UserResponse(u)));
    }

    [HttpGet("{uid}", Name = "GetUserById")]
    [ProducesResponseType<UserResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(string uid)
    {
        try
        {
            UserRecord foundUser = await _service.GetUserById(uid);
            return Ok(new UserResponse(foundUser));
        }
        catch (FirebaseAuthException e)
        {
            if (e.AuthErrorCode == AuthErrorCode.UserNotFound)
            {
                return NotFound(new ErrorResponse("L'utilisateur n'existe pas"));
            }
            return BadRequest(new ErrorResponse("Impossible de récupérer l'utilisateur", $"{e.AuthErrorCode}: {e.Message}"));
        }
    }

    [HttpPut("{uid}", Name = "UpdateUser")]
    [ProducesResponseType<UserResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Put(string uid, UserRequest userReq)
    {
        UserRecordArgs user = userReq.ToUser();
        user.Uid = uid;
        try
        {
            UserRecord updatedUser = await _service.UpdateUser(user);
            return Ok(new UserResponse(updatedUser));
        }
        catch (FirebaseAuthException e)
        {
            if (e.AuthErrorCode == AuthErrorCode.EmailAlreadyExists)
            {
                return BadRequest(new ErrorResponse("L'adresse email est déjà utilisée, veuillez en choisir une autre"));
            }
            if (e.AuthErrorCode == AuthErrorCode.PhoneNumberAlreadyExists)
            {
                return BadRequest(new ErrorResponse("Le numéro de téléphone est déjà utilisé, veuillez en choisir un autre"));
            }
            return BadRequest(new ErrorResponse("Impossible de mettre à jour l'utilisateur", $"{e.AuthErrorCode}: {e.Message}"));
        }
    }
}
