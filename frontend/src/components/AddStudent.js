import React, { useState } from 'react';

const subjects = ['CNT','ANN','CC','DAA'];

export default function AddStudent({ onDone }) {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [mse, setMse] = useState({CNT:'',ANN:'',CC:'',DAA:''});
  const [ese, setEse] = useState({CNT:'',ANN:'',CC:'',DAA:''});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateMarks = () => {
    for (let s of subjects) {
      const a = Number(mse[s]), b = Number(ese[s]);
      if (isNaN(a) || isNaN(b) || a < 0 || a > 100 || b < 0 || b > 100) return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateMarks()) {
      setMessage('Please enter valid marks between 0 and 100 for all subjects.');
      return;
    }
    setLoading(true);
    setMessage('');
    const payload = {
      name,
      rollNo: roll,
      mse: Object.fromEntries(subjects.map(s => [s, Number(mse[s] || 0)])),
      ese: Object.fromEntries(subjects.map(s => [s, Number(ese[s] || 0)]))
    };
    try {
      const res = await fetch('http://localhost:8080/api/students', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const txt = await res.text();
        setMessage('Error: ' + txt);
      } else {
        const data = await res.json();
        setMessage('Saved successfully. Overall: ' + data.overallPercentage + '%, Result: ' + data.result);
        setName(''); setRoll(''); setMse({CNT:'',ANN:'',CC:'',DAA:''}); setEse({CNT:'',ANN:'',CC:'',DAA:''});
      }
    } catch(err) {
      setMessage('Could not reach backend. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-blue-700 mb-3">Add New Student</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600">Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Roll No</label>
            <input value={roll} onChange={e=>setRoll(e.target.value)} required className="mt-1 w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full mt-2">
            <thead>
              <tr className="text-sm text-slate-600">
                <th className="text-left py-2">Subject</th>
                <th className="text-left py-2">MSE (out of 100)</th>
                <th className="text-left py-2">ESE (out of 100)</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s} className="align-middle">
                  <td className="py-2">{s}</td>
                  <td className="py-2">
                    <input type="number" min="0" max="100" value={mse[s]} onChange={e=>setMse({...mse, [s]: e.target.value})} required className="w-24 border rounded px-2 py-1" />
                  </td>
                  <td className="py-2">
                    <input type="number" min="0" max="100" value={ese[s]} onChange={e=>setEse({...ese, [s]: e.target.value})} required className="w-24 border rounded px-2 py-1" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">{loading ? 'Saving...' : 'Save Student'}</button>
          <button type="button" onClick={onDone} className="px-4 py-2 border rounded text-slate-700 hover:bg-slate-50">Cancel</button>
        </div>

        {message && <div className="text-sm mt-2 text-slate-700">{message}</div>}
      </form>
    </div>
  );
}
