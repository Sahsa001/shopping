import React, { useState, useEffect } from "react";
import "./About.css";
import aboutImg from "../../assets/zav.png";



export default function About() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);

  useEffect(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) setComments(JSON.parse(savedComments));
  }, []);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      text: newComment,
      date: new Date().toLocaleString(),
      images: newImages.map((file) => URL.createObjectURL(file)),
      likes: 0
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setNewComment("");
    setNewImages([]);
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleImageClick = (images, index) => {
    setLightboxImages(images.map((src) => ({ src })));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLike = (idx) => {
    const updatedComments = [...comments];
    updatedComments[idx].likes += 1;
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const handleDelete = (idx) => {
    const updatedComments = comments.filter((_, i) => i !== idx);
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-image">
          <img src={aboutImg} alt="О компании" />
        </div>

        <div className="about-content">
          <h1>О компании</h1>
          <p>
            Компания <strong>DEMM</strong> предлагает изысканные смесители,
            душевые системы и аксессуары для ванных комнат. Мы заботимся о
            качестве продукции и постоянно расширяем ассортимент, чтобы
            удовлетворить потребности наших клиентов.
          </p>

          <a href="/contacts" className="about-btn">Связаться с нами</a>

          <div className="about-facts">
            <div className="fact">
              <h2>10+</h2>
              <p>Жыл тажрыйба</p>
            </div>
            <div className="fact">
              <h2>5000+</h2>
              <p>Кардарлар</p>
            </div>
            <div className="fact">
              <h2>100%</h2>
              <p>Сапат кепилдиги</p>
            </div>
          </div>

          <div className="testimonials">
            <div className="testimonial">
              <p>“Продукция супер, кызмат сапаттуу!”</p>
              <h4>Иван Петров</h4>
            </div>
            <div className="testimonial">
              <p>“DEMM – бул ишенимдүү бренд.”</p>
              <h4>Мария Сидорова</h4>
            </div>
          </div>

          <div className="comments-section">
            <h2>Отзывы клиентов</h2>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Напишите ваш отзыв..."
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <button onClick={handleAddComment}>Отправить</button>

            <div className="comments-list">
              {comments.map((comment, idx) => (
                <div className="comment" key={idx}>
                  <p>{comment.text}</p>
                  <span className="comment-date">{comment.date}</span>

                  {comment.images && comment.images.length > 0 && (
                    <div className="comment-images">
                      {comment.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`комментарий ${index + 1}`}
                          onClick={() =>
                            handleImageClick(comment.images, index)
                          }
                        />
                      ))}
                    </div>
                  )}

                  <div className="comment-actions">
                    <button onClick={() => handleLike(idx)}>❤️ {comment.likes}</button>
                    <button onClick={() => handleDelete(idx)}>🗑️ Удалить</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
          index={lightboxIndex}
        />
      )}
    </div>
  );
}
