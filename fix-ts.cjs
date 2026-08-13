const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/admin/**/*.{ts,tsx}');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove unused React imports
  content = content.replace(/import React(?:, \{[^}]+\})? from 'react';\n/g, match => {
    if (match === "import React from 'react';\n") return "";
    return match.replace("React, ", "");
  });
  
  // Fix type imports for demoData
  content = content.replace(/import \{([^}]+)\} from '\.\.\/mock\/demoData';/g, (match, p1) => {
    if (p1.includes('Patient')) return "import type { Patient } from '../mock/demoData';\nimport { mockPatients } from '../mock/demoData';";
    if (p1.includes('Appointment')) return "import type { Appointment, AppointmentStatus } from '../mock/demoData';\nimport { mockAppointments } from '../mock/demoData';";
    return match;
  });

  // Fix type imports for services
  content = content.replace(/import \{([^}]+)\} from '\.\.\/services\/([^']+)'/g, (match, p1, p2) => {
    if (p1.includes('WeeklySchedule')) return "import type { WeeklySchedule } from '../services/availabilityService';\nimport { availabilityService } from '../services/availabilityService'";
    if (p1.includes('VideoSession')) return "import type { VideoSession } from '../services/videoService';\nimport { videoService } from '../services/videoService'";
    return match;
  });

  // Fix specific file issues
  if (file.includes('VideoRoom.tsx')) {
    content = content.replace('NodeJS.Timeout', 'ReturnType<typeof setInterval>');
  }

  // AuthContext type
  if (file.includes('AuthContext.tsx')) {
    content = content.replace("import { createContext, useContext, useState, useEffect, ReactNode } from 'react';", "import { createContext, useContext, useState, useEffect } from 'react';\nimport type { ReactNode } from 'react';");
  }
  
  // ProtectedRoute
  if (file.includes('ProtectedRoute.tsx')) {
    content = content.replace("import { useAuth, Role } from '../context/AuthContext';", "import { useAuth } from '../context/AuthContext';\nimport type { Role } from '../context/AuthContext';");
  }

  fs.writeFileSync(file, content);
});

// App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace('import { useEffect } from "react";\n', '');
appContent = appContent.replace('import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";', 'import { BrowserRouter, Routes, Route } from "react-router-dom";');
fs.writeFileSync('src/App.tsx', appContent);

console.log("Fixed TS errors");
