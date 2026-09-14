import { writeFileSync } from 'fs';

const q = "'";
const bt = "`";
const c = (s) => s;

// Build the file as a big string using array join
const parts = [];

parts.push(c("'use client';"));
parts.push("import { useState, useEffect } from 'react';");
parts.push("import { motion } from 'framer-motion';");
parts.push("");
parts.push("const INNER_R = 168;");
parts.push("const OUTER_R = 290;");
parts.push("const W = 840, H = 640, CX = 420, CY = 320;");
parts.push("");
parts.push("const TECH = [");
parts.push("  { id: 'react',    ring: 0, angle: 0,   name: 'React',      label: 'Component Architecture',   color: '#61dafb' },");
parts.push("  { id: 'python',   ring: 0, angle: 90,  name: 'Python',     label: 'AI & Data Engine',         color: '#ffd43b' },");
parts.push("  { id: 'nodejs',   ring: 0, angle: 180, name: 'Node.js',    label: 'Event-Driven Backend',     color: '#68a063' },");
parts.push("  { id: 'openai',   ring: 0, angle: 270, name: 'OpenAI',     label: 'LLM Pipelines & RAG',      color: '#10a37f' },");
parts.push("  { id: 'postgres', ring: 1, angle: 45,  name: 'PostgreSQL', label: 'Relational DB & Supabase', color: '#336791' },");
parts.push("  { id: 'docker',   ring: 1, angle: 135, name: 'Docker',     label: 'Containers & DevOps',      color: '#2496ed' },");
parts.push("  { id: 'ts',       ring: 1, angle: 225, name: 'TypeScript', label: 'Type-Safe Full Stack',     color: '#3178c6' },");
parts.push("  { id: 'yolo',     ring: 1, angle: 315, name: 'YOLO / CV',  label: 'Object Detection',         color: '#f97316' },");
parts.push("];");
parts.push("");

writeFileSync('app/components/TechStack_data.txt', parts.join('\n'));
console.log('verified', parts.length, 'lines');
