const fs = require('fs');
const path = require('path');

const code = [
"'use client';",
"import { useState, useEffect } from 'react';",
"import { motion } from 'framer-motion';",
"",
"const INNER_R = 168;",
"const OUTER_R = 290;",
"const W = 840, H = 640, CX = 420, CY = 320;",
"",
"const TECH = [",
"  { id: 'react',    ring: 0, angle: 0,   name: 'React',      label: 'Component Architecture',   color: '#61dafb' },",
"  { id: 'python',   ring: 0, angle: 90,  name: 'Python',     label: 'AI & Data Engine',         color: '#ffd43b' },",
"  { id: 'nodejs',   ring: 0, angle: 180, name: 'Node.js',    label: 'Event-Driven Backend',     color: '#68a063' },",
"  { id: 'openai',   ring: 0, angle: 270, name: 'OpenAI',     label: 'LLM Pipelines & RAG',      color: '#10a37f' },",
"  { id: 'postgres', ring: 1, angle: 45,  name: 'PostgreSQL', label: 'Relational DB & Supabase', color: '#336791' },",
"  { id: 'docker',   ring: 1, angle: 135, name: 'Docker',     label: 'Containers & DevOps',      color: '#2496ed' },",
"  { id: 'ts',       ring: 1, angle: 225, name: 'TypeScript', label: 'Type-Safe Full Stack',     color: '#3178c6' },",
"  { id: 'yolo',     ring: 1, angle: 315, name: 'YOLO / CV',  label: 'Object Detection',         color: '#f97316' },",
"];",
""
].join('\n');

fs.writeFileSync(path.join(__dirname, 'app', 'components', 'TechStack_part.txt'), code, 'utf8');
console.log('done', code.length);
