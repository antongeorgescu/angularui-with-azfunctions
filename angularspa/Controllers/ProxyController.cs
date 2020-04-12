using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace angularspa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProxyController : ControllerBase
    {
        // GET: api/Proxy
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "countryinfo", "weatherforecast","financials" };
        }

        // GET: api/Proxy/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return id.ToString();
        }

        // POST: api/Proxy
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Proxy/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
