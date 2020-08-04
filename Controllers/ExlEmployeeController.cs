using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreExl.Data;

namespace NetCoreExl.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ExlEmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExlEmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ExlEmployee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExlEmployeeView>>> GetExlEmployee()
        {
            var exlEmployee = _context.ExlEmployeeView.ToList();
            return await _context.ExlEmployeeView.ToArrayAsync();
        }

        // GET: api/ExlEmployee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExlEmployee>> GetExlEmployee(long id)
        {
            var exlEmployee = await _context.ExlEmployee.FindAsync(id);

            if (exlEmployee == null)
            {
                return NotFound();
            }

            return exlEmployee;
        }

        // PUT: api/ExlEmployee/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExlEmployee(long id, ExlEmployee exlEmployee)
        {
            if (id != exlEmployee.Id)
            {
                return BadRequest();
            }

            _context.Entry(exlEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExlEmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ExlEmployee
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ExlEmployee>> PostExlEmployee(ExlEmployee exlEmployee)
        {
            _context.ExlEmployee.Add(exlEmployee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ExlEmployeeExists(exlEmployee.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetExlEmployee", new { id = exlEmployee.Id }, exlEmployee);
        }

        // DELETE: api/ExlEmployee/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ExlEmployee>> DeleteExlEmployee(long id)
        {
            var exlEmployee = await _context.ExlEmployee.FindAsync(id);
            if (exlEmployee == null)
            {
                return NotFound();
            }

            _context.ExlEmployee.Remove(exlEmployee);
            await _context.SaveChangesAsync();

            return exlEmployee;
        }

        private bool ExlEmployeeExists(long id)
        {
            return _context.ExlEmployee.Any(e => e.Id == id);
        }
    }
}
