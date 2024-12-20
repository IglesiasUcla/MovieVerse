import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Welcome from './welcome'
import Profile_information from './profile_information'
import Create_account from './create_account'
import HomePage from './homePage'
import Test from './test'
import Login from './login'
import Profile_user from './profile_user'
import AddMovie from './addMovie'
import Change_password from './change_password'
import Password_recovery from './password_recovery'
import Profile_Settings from './profile_Settings'
import Search from './search'
import Post_tags from './post_tags'
import CreatePost_review from './createPost_review'
import SearchMovieSearch from './searchMovieSearch'
import PasswordRecovery2 from './passwordRecovery2'
import HomePage_post from './homePage_post'
import Search_posts from './search_posts'
import Post_comments from './post_comments'
import UserPosts from './userPosts'
import SearchMovieGenre from './searchMovieGenre'
import MyPosts from './myPosts'
import MovieScreen from './movie/[movieId]'
import Other_user_information from './other_user_information'
import Activity_favorite_movies from './activity_favorite_movies'
import YearListScreen from './yearListScreen'
import MoviesByYear from './moviesByYear/[year]'

const index = () => {

    return <Welcome/> 

}

export default index