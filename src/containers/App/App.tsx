import {Photo} from 'components/Photo/Photo';
import {cn} from 'utils/classname';

import '../../styles/root.scss';
import './App.scss';

const block = cn('app');

export function App() {
    return (
        <div className={block()}>
            <Photo />
        </div>
    );
}
