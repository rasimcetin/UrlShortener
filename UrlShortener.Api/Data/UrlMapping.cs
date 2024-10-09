namespace UrlShortener.Api.Data
{
    public class UrlMapping
    {
        public Guid Id { get; set; }
        public string ShortCode { get; set; } = string.Empty;
        public string LongUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}