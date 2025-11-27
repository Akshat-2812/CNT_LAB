import React, { useState } from 'react';
import AddStudent from './components/AddStudent';
import DisplayResult from './components/DisplayResult';

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <header className="w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-blue-800">VIT Semester Result Portal</h1>
            <p className="text-sm text-slate-500 mt-1">Semester results — CNT, ANN, CC, DAA</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500">Backend: </span>
            <span className="text-xs font-medium text-slate-700">http://localhost:8080</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-4xl mt-8">
        {view === 'home' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Welcome</h2>
            <p className="text-sm text-slate-600 mb-6">Use the options below to add students or view their semester results.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setView('add')}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Add New Student
              </button>
              <button
                onClick={() => setView('display')}
                className="w-full sm:w-auto px-6 py-3 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 transition"
              >
                Display Result
              </button>
            </div>
          </div>
        )}

        {view === 'add' && (
          <div className="mt-4">
            <button onClick={() => setView('home')} className="text-sm text-blue-600 hover:underline mb-3">&larr; Back to Home</button>
            <AddStudent onDone={() => setView('home')} />
          </div>
        )}

        {view === 'display' && (
          <div className="mt-4">
            <button onClick={() => setView('home')} className="text-sm text-blue-600 hover:underline mb-3">&larr; Back to Home</button>
            <DisplayResult />
          </div>
        )}
      </main>

      <footer className="w-full max-w-4xl mt-8">
        <div className="text-center text-xs text-slate-400">VIT Result App — React + Spring Boot + MongoDB</div>
      </footer>
    </div>
  );
}
