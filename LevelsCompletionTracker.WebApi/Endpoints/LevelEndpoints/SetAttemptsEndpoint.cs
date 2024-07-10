using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.LevelEndpoints
{
    public class SetAttemptsEndpoint : EndpointWithoutRequest<Response>
    {
        private readonly LevelInteractor levelInteractor;

        public SetAttemptsEndpoint(LevelInteractor levelInteractor)
        {
            this.levelInteractor = levelInteractor;
        }

        public override void Configure()
        {
            Post("set-attempts");
            AllowAnonymous();
            Group<LevelEndpoints>();
        }

        public override async Task HandleAsync(CancellationToken token)
        {
            int id = Query<int>("id");
            int attempts = Query<int>("attempts");
            bool append = Query<bool>("append");

            var response = await levelInteractor.SetAttemptsAsync(id, attempts, append);

            int code = response.Error ? 400 : 200;

            await SendAsync(response, code, token);
        }
    }
}
