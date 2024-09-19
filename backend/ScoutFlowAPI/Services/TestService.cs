using System;
using Microsoft.EntityFrameworkCore;
using ScoutFlowAPI.Data;
using ScoutFlowAPI.Models;

namespace ScoutFlowAPI.Services;

public class TestService(ScoutFlowContext context)
{
    private readonly ScoutFlowContext _context = context;

    public async Task<IEnumerable<Test>> GetTests()
    {
        return await _context.Tests.ToListAsync();
    }

    public async Task<IEnumerable<Test>> GetTests(int page, int pageSize)
    {
        return await _context.Tests.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
    }

    public async Task<Test?> GetTestById(int id)
    {
        try
        {
            return await _context.Tests.SingleAsync(t => t.Id == id);
        }
        catch (InvalidOperationException)
        {
            return null;
        }
    }

    public async Task<Test?> CreateTest(Test test)
    {
        test.CreatedAt = DateTime.Now;
        test.UpdatedAt = DateTime.Now;
        try
        {
            var res = await _context.Tests.AddAsync(test);
            await _context.SaveChangesAsync();
            return res.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }

    public async Task<Test?> UpdateTest(Test test)
    {
        test.UpdatedAt = DateTime.Now;
        try
        {
            var res = _context.Tests.Update(test);
            await _context.SaveChangesAsync();
            return res.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }

    public async Task<bool> DeleteTest(int id)
    {
        try
        {
            var test = await _context.Tests.SingleAsync(t => t.Id == id);
            _context.Tests.Remove(test);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (InvalidOperationException)
        {
            return false;
        }
        catch (DbUpdateException)
        {
            return false;
        }
    }
}
