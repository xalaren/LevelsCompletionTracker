using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.CircleRunEndpoints
{
    public class RemoveCircleRunEndpoint : EndpointWithoutRequest<Response>
    {
        private readonly CircleRunInteractor circleRunInteractor;

        public RemoveCircleRunEndpoint(CircleRunInteractor circleRunInteractor)
        {
            this.circleRunInteractor = circleRunInteractor;
        }

        public override void Configure()
        {
            Delete("remove");
            AllowAnonymous();
            Group<CircleRunEndpoints>();
        }

        public override async Task HandleAsync(CancellationToken token)
        {
            int circleRunId = Query<int>("circleRunId");

            var response = await circleRunInteractor.RemoveCircleRunAsync(circleRunId);
            int code = response.Error ? 400 : 200;

            await SendAsync(response, code, token);
        }
    }
}
