import React, {useState, useEffect} from 'react';
import {Button} from 'antd';

export default React.forwardRef((props, ref) => {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    useEffect(() => {
        document.title = `you clicked ${count} times`
        setCount2(count2 + 1);
        console.log('useEffect')
    }, [count])
    
    return <div style={{margin: '20px 0'}}>
        <Button onClick={() => setCount(count + 1)}>Add（加到5就报错）</Button>
        <div ref={ref}>Result:{count <= 5 ? count : count()}</div>
        <div>count2:{count2}</div>
    </div>
})