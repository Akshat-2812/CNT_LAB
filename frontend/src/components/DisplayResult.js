import React, { useState } from 'react';

export default function DisplayResult() {
  const [roll, setRoll] = useState('');
  const [student, setStudent] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetch = async (e) => {
    e.preventDefault();
    setMsg(''); setStudent(null); setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/students/' + encodeURIComponent(roll));
      if (!res.ok) {
        const txt = await res.text();
        setMsg(txt);
      } else {
        const data = await res.json();
        setStudent(data);
      }
    } catch(err) {
      setMsg('Could not reach backend. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-blue-700 mb-3">Display Student Result</h3>

      <form onSubmit={handleFetch} className="flex gap-3 items-center mb-4">
        <label className="text-sm text-slate-600">Roll No:</label>
        <input value={roll} onChange={e=>setRoll(e.target.value)} required className="border rounded px-3 py-2" />
        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">{loading ? 'Searching...' : 'Get Result'}</button>
      </form>

      {msg && <div className="text-sm text-red-600 mb-3">{msg}</div>}

      {student && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-md font-semibold">{student.name} — <span className="text-slate-600">{student.rollNo}</span></h4>
              <div className="text-sm text-slate-500">Semester: --</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Overall</div>
              <div className="text-xl font-bold">{student.overallPercentage}%</div>
              <div className={`mt-1 inline-block px-3 py-1 rounded-full text-sm ${student.result === 'PASS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{student.result}</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-sm text-slate-600">
                  <th className="text-left py-2 border-b">Subject</th>
                  <th className="text-left py-2 border-b">MSE</th>
                  <th className="text-left py-2 border-b">ESE</th>
                  <th className="text-left py-2 border-b">Total (weighted)</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(student.subjectTotal).map(sub => (
                  <tr key={sub} className="align-middle">
                    <td className="py-2 border-b">{sub}</td>
                    <td className="py-2 border-b">{student.mse[sub]}</td>
                    <td className="py-2 border-b">{student.ese[sub]}</td>
                    <td className="py-2 border-b">{Number(student.subjectTotal[sub]).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
