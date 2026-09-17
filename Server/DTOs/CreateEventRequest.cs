using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class CreateEventRequest
    {
        [Required(ErrorMessage = "Title is required")]
        public required string Title { get; init; }
        [Required(ErrorMessage = "Date of event is required")]
        public required DateOnly DateOfEvent { get; init; }
        [Required(ErrorMessage = "Time of event is required")]
        public required TimeOnly TimeOfEvent { get; init; }
        [Required(ErrorMessage = "Category is required")]
        public required string Category { get; init; }
        [Required(ErrorMessage = "Location is required")]
        public required string Location { get; init; }
        public string? Description { get; init; }
    }
}
