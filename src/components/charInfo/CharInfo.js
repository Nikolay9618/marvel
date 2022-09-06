import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();


    componentDidMount() {
        this.updateChar()

    }

    componentDidUpdate(prev) {
        if (this.props.id !== prev.id) {
            this.updateChar()

        }
    }

    onChatLoaded = (char) => {
        this.setState({ char, loading: false })
    }

    oncharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const { id } = this.props;
        if (!id) {
            return;
        }

        this.oncharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onChatLoaded)
            .catch(this.onError)
    }




    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error || !char) ? <View char={char} /> : null;


        const id = this.props.id
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imgStyle = { objectFit: 'cover' }

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'contain' }
    }

    const comic = comics.map((item, i) => {
        if (i > 9) return;
        return (
            <li className="char__comics-item">
                {item.name}
            </li>
        )
    })


    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is not comics with this charecter'}
                {comic}
            </ul>
        </>
    )
}


export default CharInfo;