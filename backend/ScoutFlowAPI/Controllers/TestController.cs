using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScoutFlowAPI.Models;
using ScoutFlowAPI.Services;

namespace ScoutFlowAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController(ILogger<TestController> logger, TestService service) : ControllerBase
{
    private readonly ILogger<TestController> _logger = logger;
    private readonly TestService _service = service;

    [HttpGet(Name = "GetTests")]
    [ProducesResponseType<IEnumerable<Test>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        return Ok(await _service.GetTests());
    }

    [HttpGet("{id}", Name = "GetTestById")]
    [ProducesResponseType<Test>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(int id)
    {
        Test? foundTest = await _service.GetTestById(id);
        if (foundTest == null)
        {
            return NotFound(new ErrorResponse("Le test n'existe pas"));
        }
        return Ok(foundTest);
    }
}
