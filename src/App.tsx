import { useState } from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
import { 
  sandpackDark,
  nightOwl,
  atomDark,
  dracula
} from '@codesandbox/sandpack-themes'
import './App.css'

// 定义框架选项
type Framework = 'react' | 'vue' | 'angular'

// 定义每个框架的初始文件
const TEMPLATES: Record<Framework, Record<string, string>> = {
  react: {
    '/App.js': `import { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="container">
      <h1>React 示例</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          点击次数: {count}
        </button>
        <p>
          编辑 <code>App.js</code> 并保存以测试
        </p>
      </div>
    </div>
  );
}`,
    '/styles.css': `.container {
  font-family: sans-serif;
  text-align: center;
  padding: 20px;
}

.card {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
  padding: 8px 16px;
  background-color: #0971F1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 12px;
}

button:hover {
  background-color: #0966d3;
}`,
  },
  vue: {
    '/src/App.vue': `<template>
  <div class="container">
    <h1>Vue 示例</h1>
    <div class="card">
      <button @click="count++">
        点击次数: {{ count }}
      </button>
      <p>
        编辑 <code>App.vue</code> 并保存以测试
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<style>
.container {
  font-family: sans-serif;
  text-align: center;
  padding: 20px;
}

.card {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 12px;
}

button:hover {
  background-color: #3aa876;
}
</style>`,
  },
  angular: {
    '/src/app/app.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  count = 0;
  
  increment() {
    this.count++;
  }
}`,
    '/src/app/app.component.html': `<div class="container">
  <h1>Angular 示例</h1>
  <div class="card">
    <button (click)="increment()">
      点击次数: {{ count }}
    </button>
    <p>
      编辑 <code>app.component.ts</code> 或 <code>app.component.html</code> 并保存以测试
    </p>
  </div>
</div>`,
    '/src/app/app.component.css': `.container {
  font-family: sans-serif;
  text-align: center;
  padding: 20px;
}

.card {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
  padding: 8px 16px;
  background-color: #dd0031;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 12px;
}

button:hover {
  background-color: #c3002f;
}`
  }
}

// 主题选项
const THEMES = {
  'sandpackDark': sandpackDark,
  'nightOwl': nightOwl,
  'atomDark': atomDark,
  'dracula': dracula
}

function App() {
  const [activeFramework, setActiveFramework] = useState<Framework>('react')
  const [activeTheme, setActiveTheme] = useState('sandpackDark')

  return (
    <div className="app">
      <header className="header">
        <h1>在线代码编辑器</h1>
        <div className="controls">
          <div className="select-container">
            <label htmlFor="framework">框架:</label>
            <select 
              id="framework" 
              value={activeFramework}
              onChange={(e) => setActiveFramework(e.target.value as Framework)}
            >
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
            </select>
          </div>
          <div className="select-container">
            <label htmlFor="theme">主题:</label>
            <select 
              id="theme"
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}
            >
              <option value="sandpackDark">Sandpack Dark</option>
              <option value="nightOwl">Night Owl</option>
              <option value="atomDark">Atom Dark</option>
              <option value="dracula">Dracula</option>
            </select>
          </div>
        </div>
      </header>
      
      <main className="editor-container">
        <Sandpack
          template={activeFramework}
          theme={THEMES[activeTheme as keyof typeof THEMES]}
          files={TEMPLATES[activeFramework]}
          options={{
            autorun: true,
            autoReload: false,
            showLineNumbers: true,
            showInlineErrors: true,
            showRefreshButton: true,
            // showNavigator: true,
            showTabs: true,
            editorHeight: 800,
            showConsole: false,
            showConsoleButton: true,
            editorWidthPercentage: 50,
            visibleFiles: Object.keys(TEMPLATES[activeFramework]),
            classes: {
              'sp-wrapper': 'custom-wrapper',
              'sp-editor': 'custom-editor',
              'sp-tab-button': 'custom-tab',
              'sp-preview': 'custom-preview',
              'sp-file-explorer': 'custom-explorer'
            }
          }}
          customSetup={{
            dependencies: {}
          }}
        />
      </main>
    </div>
  )
}

export default App
