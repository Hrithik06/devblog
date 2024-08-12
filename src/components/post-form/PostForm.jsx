import React, { useEffect, useCallback } from 'react';
import { Button, RTE, Input, Select } from '../index';
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
        //if there is already existing post then it should be updated, use appWrite file and post Service
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
            if (dbEditPost) navigate(`/post/${dbEditPost.$id}`);
        } else {
            //else create a new post

            //store file returned by appwriteFileService
            const dbNewFile = await appwriteFileService.uploadFile(
                data.image[0],
            );

            if (dbNewFile) {
                console.log(userData);

                const dbNewPost = await appwritePostService.createPost({
                    ...data,
                    featuredImage: dbNewFile.$id,
                    userId: userData.$id,
                });
                if (dbNewPost) navigate(`/post/${dbNewPost.$id}`);
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
        <form onSubmit={handleSubmit(submitPost)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register('title', { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteFileService.getFilePreview(
                                post.featuredImage,
                            )}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className="mb-4"
                    {...register('status', { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? 'bg-green-500' : undefined}
                    className="w-full"
                >
                    {post ? 'Update' : 'Submit'}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
