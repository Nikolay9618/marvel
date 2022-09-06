import { Component } from 'react';

import './charList.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    constructor({ props }) {
        super({ props })
    }
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1500,
        charEnded: false
    }

    marvelService = new MarvelService();
    componentDidMount() {
        this.updateChar()

    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onChatLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }


    onChatLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }


        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        })
        )
    }



    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {

        this.marvelService
            .getAllCharacters()
            .then(this.onChatLoaded)
            .catch(this.onError)
    }

    renderItems(arr) {
        return arr.map(arr => {
            let imgStyle = { objectFit: 'cover' }

            if (arr.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { objectFit: 'unset' }
            }
            return <li
                className="char__item"
                key={arr.id}
                onClick={() => this.props.onGetID(arr.id)}
            >
                <img src={arr.thumbnail} alt={arr.name} style={imgStyle} />
                <div className="char__name">{arr.name}</div>
            </li>
        })
    }

    render() {
        const { charList, loading, error, newItemLoading, offset, charEnded } = this.state

        const items = this.renderItems(charList)

        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {spinner}
                <ul className="char__grid">
                    {errorMessage}
                    {content}
                </ul>
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{
                        'display': charEnded ? 'none' : 'block'
                    }}
                    onClick={() => { this.onRequest(offset) }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}



export default CharList;



