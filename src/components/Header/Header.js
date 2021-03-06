import React, {Component} from 'react';
import './Header.css';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import BoardNav from './BoardNav/BoardNav';
import NewBoard from './NewBoard/NewBoard';
import Contact from './Contact/Contact';
import Search from './Search/Search';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {getLists, 
        getCards, 
        getUser, 
        getBoards,
} from '../../ducks/reducer';
import LogoTarget from '../../media/LogoTarget.png';


class Header extends Component {
    constructor(){
        super();

        this.state = {
            searchBar: '',
            searchToggle: false,
            boardClick: false,
            contactClick: false,
            newBoardClick: false,
        }

        this.changeHeader = this.changeHeader.bind(this);
        this.boardClickToggle = this.boardClickToggle.bind(this);
        this.contactClickToggle = this.contactClickToggle.bind(this);
        this.newBoardToggle = this.newBoardToggle.bind(this);
        this.searchFocus = this.searchFocus.bind(this);
        this.searchBlur = this.searchBlur.bind(this);
        this.timoutBlur = this.timoutBlur.bind(this);

    }

    componentDidMount(){
        let {getUser, getBoards, getCards, getLists} = this.props;
        axios.all([getUser(), getBoards(), getLists(), getCards()]);
    }

    changeHeader(e){
        this.setState({[e.target.name]: e.target.value});
    }

    boardClickToggle(){
        this.setState({boardClick: !this.state.boardClick})
    }

    contactClickToggle(){
        this.setState({contactClick: !this.state.contactClick})
    }

    newBoardToggle(){
        this.setState({newBoardClick: !this.state.newBoardClick})
    }

    searchFocus(){
        this.setState({searchToggle: true})
    }

    searchBlur(){
        this.setState({searchToggle: false, searchBar: ''})
    }

    timoutBlur(){
        setTimeout(this.searchBlur, 100);
    }

    render(){
        let {currentBoard} = this.props;
        let {boardClick, contactClick, newBoardClick, searchBar, searchToggle} = this.state;
        // console.log(searchToggle);
        return(
            <div className='head-parent image-head1'>
                <div className='head-content'>
                    <div className='head-search'>
                        <BoardNav currentBoard = {currentBoard} boardClick={boardClick} clickToggle={this.boardClickToggle} className='boardnav' />
                        <button className='board-search' onClick={this.boardClickToggle}>
                            <p className='header-board-menu'>
                                <FontAwesome className='head-target' name='fas fa-bullseye fa-lg'/>
                                Boards
                            </p>
                        </button>
                        <input name='searchBar' className='board-search head-input' onChange={this.changeHeader} onBlur={this.timoutBlur} value={searchBar}/>
                        <Search search={searchBar} searchFocus={this.searchFocus} searchToggle={searchToggle}/>
                        <FontAwesome  className='search-icon' name="far fa-search"></FontAwesome>
                    </div> 
                    {/* <Link to='/home' style={{textDecoration: 'none'}}> */}
                    <a className='head-title' href='/#/home' style={{textDecoration: 'none'}}>
                        <img className='title-logo' src={LogoTarget} alt='logo' />
                    </a> 
                    <div className='head-nav'>
                        <button className='board-search mini' onClick={this.newBoardToggle}>
                            <FontAwesome className='head-new' name='far fa-plus-square fa-lg' />
                        </button>
                        <NewBoard newBoardClick={newBoardClick} newBoardToggle={this.newBoardToggle} />
                        <button className='board-search mini' onClick={this.contactClickToggle}>
                            <FontAwesome className='head-note' name='far fa-at fa-lg' />
                        </button>
                        <Contact contactClick={contactClick} contactToggle={this.contactClickToggle} />
                        <Link to={`/profile/${this.props.user.id}`}>
                            <img className='profile-img' src={this.props.user.profile_img} alt='profile' />
                        </Link>
                    </div> 
                </div> 
            </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        boards: state.board
    }
}

export default withRouter(connect(mapStateToProps, {getUser, getBoards, getCards, getLists})(Header));