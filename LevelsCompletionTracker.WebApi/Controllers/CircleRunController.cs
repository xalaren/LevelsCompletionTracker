using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;
using Microsoft.AspNetCore.Mvc;

namespace LevelsCompletionTracker.WebApi.Controllers
{
    [ApiController]
    [Route("api/CircleRunController")]
    public class CircleRunController : ControllerBase
    {
        private readonly CircleRunInteractor circleRunInteractor;

        public CircleRunController(CircleRunInteractor circleRunInteractor)
        {
            this.circleRunInteractor = circleRunInteractor;
        }

        [HttpPost("create")]
        public async Task<Response> CreateCircleRunAsync(CircleRunDto circleRunDto)
        {
            return await circleRunInteractor.CreateCircleRunAsync(circleRunDto);
        }

        [HttpDelete("remove")]
        public async Task<Response> RemoveCircleRunAsync(int circleRunId)
        {
            return await circleRunInteractor.RemoveCircleRunAsync(circleRunId);
        }

        [HttpDelete("remove-all")]
        public Response RemoveAllCircleRunsFromLevel(int levelId)
        {
            return circleRunInteractor.RemoveAllCircleRunsFromLevel(levelId);
        }
    }
}
