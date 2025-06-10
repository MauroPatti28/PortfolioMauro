import React from 'react';
import {
  Server,
  Database,
  Code,
  Globe,
  FileType2,
  CreditCard,
  Link,
  Atom,
  RefreshCw,
  Wind,
  Flame,
  GitBranch,
  UploadCloud,
} from 'lucide-react';

function Skills() {
  const skills = [
    { icon: <Server className="w-8 h-8" />, name: 'Node.js'},
    { icon: <Database className="w-8 h-8" />, name: 'MongoDB'},
    { icon: <Database className="w-8 h-8" />, name: 'SQL'},
    { icon: <Code className="w-8 h-8" />, name: 'JavaScript' },
    { icon: <FileType2 className="w-8 h-8" />, name: 'TypeScript'},
    { icon: <Globe className="w-8 h-8" />, name: 'APIs REST' },
    { icon: <CreditCard className="w-8 h-8" />, name: 'Stripe' },
    { icon: <Link className="w-8 h-8" />, name: 'Webhooks' },
    { icon: <Flame className="w-8 h-8" />, name: 'Firebase' },
    { icon: <GitBranch className="w-8 h-8" />, name: 'Git & GitHub' },
    { icon: <UploadCloud className="w-8 h-8" />, name: 'Multer / Uploads' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tecnologías</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Herramientas y tecnologías con las que trabajo día a día
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-blue-600 mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{skill.name}</h3>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
