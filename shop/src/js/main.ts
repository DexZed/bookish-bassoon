import '../css/style.css'
import { setupCounter } from './counter'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    Hello Vite!

  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
