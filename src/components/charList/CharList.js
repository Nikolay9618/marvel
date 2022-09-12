import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'

import './charList.scss';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);

    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [fetching, setFetching] = useState(false)



    const { loading, error, getAllCharacters, clearError } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    // useEffect(() => {
    //     if (fetching) {
    //         setTimeout(() => {
    //             setOffset(offset => offset + 9)
    //             console.log('scroll')
    //             onRequest(offset);
    //             setFetching(false);
    //         }, 100)

    //     }
    // }, [fetching])

    // useEffect(() => {
    //     document.addEventListener('scroll', scrollHandler)
    //     return function () {
    //         document.removeEventListener('scroll', scrollHandler)
    //     }
    // }, [])

    // const scrollHandler = (e) => {
    //     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
    //         setFetching(fetching => true)
    //     }
    // }

    const onRequest = (offset) => {
        getAllCharacters(offset)
            .then(onChatLoaded)
    }



    const onChatLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);

        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }





    const itemRefs = useRef([]);



    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        return arr.map((arr, i) => {
            let imgStyle = { objectFit: 'cover' }

            if (arr.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { objectFit: 'unset' }
            }
            return <li
                className="char__item"
                key={arr.id}
                ref={el => itemRefs.current[i] = el}
                onClick={() => {
                    props.onGetID(arr.id);
                    focusOnItem(i)
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onGetID(arr.id);
                        focusOnItem(i)
                    }
                }}
            >
                <img src={arr.thumbnail} alt={arr.name} style={imgStyle} />
                <div className="char__name">{arr.name}</div>
            </li >
        })
    }

    const items = renderItems(charList)

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null

    return (
        <div className="char__list">
            {spinner}
            <ul className="char__grid">
                {errorMessage}
                {items}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{
                    'display': charEnded ? 'none' : 'block'
                }}
                onClick={() => { onRequest(offset) }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    onGetID: PropTypes.func.isRequired
}

export default CharList;



