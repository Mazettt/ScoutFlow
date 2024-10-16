using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScoutFlowAPI.Models;
using ScoutFlowAPI.Services;

namespace ScoutFlowAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController(UserService service) : ControllerBase
    {
        [HttpGet("pending-users", Name = "GetPendingUsers")]
        [ProducesResponseType<IEnumerable<PendingUserResponse>>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            IEnumerable<User> pendingUsers = await service.GetUsers(false);
            return Ok(pendingUsers.Select(u => new PendingUserResponse(u)));
        }

        [HttpPost("pending-users/{uid}/accept", Name = "AcceptPendingUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Accept(string uid)
        {
            try
            {
                await service.AcceptPendingUser(uid);
                //TODO: send email to user
                return Ok();
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

        [HttpDelete("pending-users/{uid}/reject", Name = "RejectPendingUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Reject(string uid)
        {
            try
            {
                await service.DeletePendingUser(uid);
                //TODO: send email to user
                return Ok();
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
    }
}
