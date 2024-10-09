using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrlShortener.Api.Data;

namespace UrlShortener.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlShortenerController : ControllerBase
    {
        private readonly UrlShortenerDbContext _context;

        public UrlShortenerController(UrlShortenerDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var mappings = await _context.UrlMappings.ToListAsync();
            return Ok(mappings);
        }

        [HttpPost]
        public async Task<IActionResult> ShortenUrl([FromBody] UrlShortenRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.LongUrl))
            {
                return BadRequest("URL cannot be empty");
            }

            string shortCode = Guid.NewGuid().ToString("N").Substring(0, 8);

            var urlMapping = new UrlMapping
            {
                ShortCode = shortCode,
                LongUrl = request.LongUrl,
                CreatedAt = DateTime.UtcNow
            };

            _context.UrlMappings.Add(urlMapping);
            await _context.SaveChangesAsync();

            string shortUrl = $"https://example.com/{shortCode}";

            return Ok(new { ShortUrl = shortUrl });
        }

        [HttpGet("{shortCode}")]
        public async Task<IActionResult> GetLongUrl(string shortCode)
        {
            var mapping = await _context.UrlMappings.FirstOrDefaultAsync(m => m.ShortCode == shortCode);

            if (mapping == null)
            {
                return NotFound();
            }

            return Ok(new { LongUrl = mapping.LongUrl });
        }

        [HttpDelete("{shortCode}")]
        public async Task<IActionResult> DeleteMapping(string shortCode)
        {
            var mapping = await _context.UrlMappings.FirstOrDefaultAsync(m => m.ShortCode == shortCode);

            if (mapping == null)
            {
                return NotFound();
            }

            _context.UrlMappings.Remove(mapping);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class UrlShortenRequest
    {
        public string? LongUrl { get; set; }
    }
}