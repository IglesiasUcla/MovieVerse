import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Welcome from './welcome'
import Profile_information from './profile_information'
import ReleaseData_1 from './releaseData_1'
import Create_account from './create_account'
import HomePage from './homePage'
import Test from './test'
import Login from './login'
import Profile_user from './profile_user'
import AddMovie from './addMovie'
import MovieReview from './movieReview'
import Change_password from './change_password'
import Password_recovery from './password_recovery'
import Profile_Settings from './profile_Settings'
import TopBack from '../components/TopBackButton'
import Header from '../components/Header'
import CreatePost_review from './createPost_review'
import HomePage_post from './homePage_post'
import Search_posts from './search_posts'
import Post_comments from './post_comments'

const index = () => {
    // const router= useRouter();
    return <Welcome /> 

    // return <Profile_information/>

    // (
        // <View>
            
        {/* <Text>index</Text>
        <Button title='button' onPress={()=> router.push('welcome') } /> */}

        {/* </View> */}
    // )
}

export default index