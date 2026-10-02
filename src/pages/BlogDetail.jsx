import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye, Calendar, ArrowLeft, ArrowRight, User, Share2, ChevronRight, Tag } from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';
import { blogApi } from '../services/api';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await blogApi.getBySlug(slug);
        if (res.success) setPost(res.data);
        else setError('Article not found');
      } catch (err) {
        setError(err.message || 'Error loading article');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 max-w-7xl mx-auto px-4 text-center">
        <div className="w-12 h-12 border-4 border-[#9B7EDE] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500">Loading article content...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-40 pb-24 max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold font-['Outfit']">Article Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The article you are looking for has been moved or retired.</p>
        <Link to="/blog" className="mt-6 inline-block px-6 py-2.5 bg-[#9B7EDE] text-white rounded-xl font-semibold text-sm">
          Return to All Articles
        </Link>
      </div>
    );
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Recent';

  return (
    <>
      <SeoHelmet
        title={post.title}
        description={post.excerpt}
      />

      <article className="pt-32 pb-24 md:pt-40 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/blog" className="hover:text-purple-600">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#9B7EDE] truncate">{post.title}</span>
          </nav>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            {post.categoryName}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-['Outfit'] text-slate-900 dark:text-white mt-4 leading-tight">
            {post.title}
          </h1>

          {/* Metadata bar */}
          <div className="mt-6 pb-6 border-b border-slate-200 dark:border-purple-900/30 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#9B7EDE]/20 text-[#9B7EDE] flex items-center justify-center font-bold text-sm">
                {post.authorName.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{post.authorName}</div>
                <div className="text-[11px] text-purple-600 dark:text-purple-300">{post.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#9B7EDE]" />
                <span>{publishedDate}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#9B7EDE]" />
                <span>{post.readTimeMinutes} min read</span>
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#9B7EDE]" />
                <span>{post.viewCount} views</span>
              </span>
            </div>
          </div>

          {/* Cover image */}
          <div className="mt-8 rounded-3xl overflow-hidden shadow-2xl max-h-[450px]">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* HTML Article Body */}
          <div
            className="mt-12 prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-base space-y-4"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-purple-900/30 flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-slate-400 mr-1" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Articles */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white mb-6">
                Related Technical Reading
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {post.relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/blog/${rel.slug}`}
                    className="glass-card rounded-2xl p-4 flex flex-col justify-between group hover:border-[#9B7EDE] transition-all"
                  >
                    <div>
                      <div className="h-32 rounded-xl overflow-hidden bg-slate-800 mb-3">
                        <img src={rel.coverImageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white font-['Outfit'] line-clamp-2 group-hover:text-[#9B7EDE]">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-300 flex items-center gap-1 mt-3">
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default BlogDetail;
