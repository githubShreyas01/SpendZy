import { Button } from 'antd';
import "./stylesheets/text-elements.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/alignments.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/theme.css";

function App() {
  return (
    <div className='bg-secondary h-screen flex items-center justify-center'>
        <h1>SpendZy</h1>
        <Button type="primary">primary Button</Button>
    </div>
  );
}

export default App;
