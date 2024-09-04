import React, { useEffect, useCallback, useState } from 'react';
import { Button, RTE, Input, Select, CoverImageUpload } from '../index';
import appwritePostService from '../../appwrite/post';
import appwriteFileService from '../../appwrite/file';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
const PostForm = ({ post }) => {
    const userData = useSelector((store) => store.auth.userData);

    const navigate = useNavigate();
    const { register, watch, handleSubmit, setValue, control, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                status: post?.status || '',
            },
        });

    //data comes from react-hook-fom when submitted
    const submitPost = async (data) => {
        // if there is already existing post then it should be updated, use appWrite file and post Service
        if (post) {
            // upload the new updated file
            const dbNewFile = data?.image[0]
                ? await appwriteFileService.uploadFile(data.image[0])
                : null;
            // delete the old linked file
            if (dbNewFile) {
                await appwriteFileService.deleteFile(post?.featuredImage);
            }
            const dbEditPost = await appwritePostService.updatePost(post?.$id, {
                ...data,
                featuredImage: dbNewFile ? dbNewFile.$id : undefined,
            });
            if (dbEditPost)
                navigate(`/post/${dbEditPost.slug}-${dbEditPost.$id}`);
        } else {
            //else create a new post
            //store file returned by appwriteFileService
            const dbNewFile = await appwriteFileService.uploadFile(
                data.image[0],
            );
            if (dbNewFile) {
                const dbNewPost = await appwritePostService.createPost({
                    ...data,
                    featuredImage: dbNewFile.$id,
                    userId: userData.$id,
                    author: userData.name,
                });
                if (dbNewPost)
                    navigate(`/post/${dbNewPost.slug}-${dbNewPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            //anyting other(whitespace, special chars) than letters and number replace with dash
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, '-');
        } else return '';
    }, []);

    useEffect(() => {
        //value: value of the input field,
        //name: name of the input field which is `title`
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value?.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submitPost)}
            className="flex flex-col lg:flex-row"
        >
            <div className="px-2 lg:w-2/3">
                <Input
                    // label="Title :"
                    placeholder="Title"
                    className="mb-4 rounded-lg p-2 text-3xl"
                    {...register('title', { required: true })}
                />
                <Input
                    // label="Slug :"
                    placeholder="Slug"
                    className="mb-4 rounded-lg p-2"
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    // label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>
            <div className="px-2 lg:w-1/3">
                <Input
                    label="Featured Image :(PNG, JPG, JPEG, GIF)"
                    type="file"
                    className="my-2 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    placeholder="cover-image"
                    {...register('image', { required: !post })}
                />

                {post && (
                    <div className="mb-4 w-full">
                        <img
                            src={appwriteFileService.getFilePreview(
                                post.featuredImage,
                                {
                                    width: 384,
                                    height: 240,
                                    gravity: 'ImageGravity.Center',
                                    quality: 70,
                                },
                            )}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className="mb-4 w-32"
                    {...register('status', { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? undefined : 'bg-green-500'}
                    className="w-1/2 text-white lg:w-full"
                >
                    {post ? 'Update' : 'Publish'}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
