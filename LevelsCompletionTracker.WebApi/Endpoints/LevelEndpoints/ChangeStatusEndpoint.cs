using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.LevelEndpoints
{
    public class ChangeStatusEndpoint : EndpointWithoutRequest<Response>
    {
        private readonly LevelInteractor levelInteractor;

        public ChangeStatusEndpoint(LevelInteractor levelInteractor)
        {
            this.levelInteractor = levelInteractor;
        }

        public override void Configure()
        {
            Post("change-status");
            AllowAnonymous();
            Group<LevelEndpoints>();
        }

        public override async Task HandleAsync(CancellationToken token)
        {
            int id = Query<int>("id");
            string? state = Query<string>("state");

            var response = await levelInteractor.ChangeStatusOfTheLevelAsync(id, state);

            int code = response.Error ? 400 : 200;

            await SendAsync(response, code, token);
        }
    }
}
