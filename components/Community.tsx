
import React, { useState } from 'react';
import { Heart, MessageSquare, Users, Send, UserCircle } from 'lucide-react';
import { ForumPost } from '../types';

const initialPosts: ForumPost[] = [
  { 
    id: 1, 
    user: "Anonim_BurungHantu", 
    content: "Akhirnya berhasil tidur 7 jam tadi malam setelah seminggu insomnia. Rasanya segar sekali!", 
    likes: 24, 
    time: "2j yang lalu", 
    tag: "Kemenangan Kecil",
    comments: [
      { id: 101, user: "PejuangTidur", content: "Wah selamat! Ada tips khusus gak kak?", time: "1j yang lalu" },
      { id: 102, user: "Anonim_BurungHantu", content: "Aku coba teknik 4-7-8 yang ada di menu Relaksasi, ampuh banget.", time: "45m yang lalu" }
    ]
  },
  { 
    id: 2, 
    user: "PejuangTangguh", 
    content: "Hari ini berat banget, rasanya mau nyerah. Tapi aku ingat teknik 'one day at a time'. Semangat buat kita semua.", 
    likes: 156, 
    time: "5j yang lalu", 
    tag: "Dukungan",
    comments: [
      { id: 201, user: "SobatMindful", content: "Peluk jauh kak! Kamu kuat.", time: "4j yang lalu" }
    ]
  },
  { 
    id: 3, 
    user: "SukaKopi", 
    content: "Tips: kalau lagi cemas, coba pegang es batu. Sensasi dinginnya bikin otak teralihkan dari panic attack.", 
    likes: 89, 
    time: "1h yang lalu", 
    tag: "Tips",
    comments: []
  },
];

const Community: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const toggleComments = (postId: number) => {
    if (activePostId === postId) {
      setActivePostId(null);
    } else {
      setActivePostId(postId);
      setNewComment("");
    }
  };

  const handleSendComment = (postId: number) => {
    if (!newComment.trim()) return;

    const commentData = {
      id: Date.now(),
      user: "Kamu", // Simulasi user yang sedang login
      content: newComment,
      time: "Baru saja"
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, commentData]
        };
      }
      return post;
    }));

    setNewComment("");
  };

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 mb-8 text-white flex justify-between items-center shadow-lg">
        <div>
          <h2 className="text-2xl font-bold mb-2">Komunitas Aman</h2>
          <p className="opacity-90 max-w-md">Tempat berbagi cerita tanpa penghakiman. Kita saling jaga di sini.</p>
        </div>
        <Users className="w-16 h-16 opacity-20" />
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            {/* Post Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">
                  {post.user[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">{post.user}</p>
                  <p className="text-xs text-slate-400">{post.time}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full font-medium">{post.tag}</span>
            </div>
            
            {/* Post Content */}
            <p className="text-slate-800 mb-4 leading-relaxed text-lg">{post.content}</p>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-6 border-t border-slate-50 pt-4">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors text-sm font-medium group"
              >
                <Heart className="w-5 h-5 group-hover:fill-rose-500 group-active:scale-125 transition-transform" /> 
                {post.likes} Dukungan
              </button>
              <button 
                onClick={() => toggleComments(post.id)}
                className={`flex items-center gap-2 transition-colors text-sm font-medium ${activePostId === post.id ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
              >
                <MessageSquare className="w-5 h-5" /> 
                {post.comments.length} Komentar
              </button>
            </div>

            {/* Comments Section */}
            {activePostId === post.id && (
              <div className="mt-6 animate-in slide-in-from-top-2 fade-in duration-300">
                <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                  
                  {/* List Existing Comments */}
                  {post.comments.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="mt-1">
                             <UserCircle className="w-6 h-6 text-slate-300" />
                          </div>
                          <div className="bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm flex-1">
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="font-bold text-xs text-slate-700">{comment.user}</span>
                              <span className="text-[10px] text-slate-400">{comment.time}</span>
                            </div>
                            <p className="text-sm text-slate-600">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-slate-400 text-sm italic">
                      Belum ada komentar. Jadilah yang pertama memberi dukungan!
                    </div>
                  )}

                  {/* Input New Comment */}
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Tulis balasan yang mendukung..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none text-sm resize-none h-20 transition-all"
                      />
                    </div>
                    <button 
                      onClick={() => handleSendComment(post.id)}
                      disabled={!newComment.trim()}
                      className="bg-indigo-600 disabled:bg-slate-300 hover:bg-indigo-700 text-white p-3 rounded-xl transition-colors shadow-md h-12 w-12 flex items-center justify-center"
                    >
                      <Send className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center text-slate-500 text-sm bg-slate-100 p-4 rounded-xl">
        <p>🔒 Forum ini dimoderasi 24/7. Ujaran kebencian tidak akan ditoleransi.</p>
      </div>
    </div>
  );
};

export default Community;
