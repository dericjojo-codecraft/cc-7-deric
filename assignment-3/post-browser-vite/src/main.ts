import './styles.css'
import { fetchPost, fetchComments } from './fetch.ts';

interface Comment {
    name: string;
    body: string;
}

document.addEventListener("DOMContentLoaded", () => {
    const postNumber = document.getElementById("post-number") as HTMLSpanElement;
    const titleElement = document.getElementById("post-title-display") as HTMLHeadingElement;
    const bodyElement = document.getElementById("post-body-display") as HTMLParagraphElement;
    const commentsContainer = document.getElementById("comments-container") as HTMLDivElement;
    const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
    const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
    const refreshBtn = document.getElementById("refresh-btn") as HTMLButtonElement;
    const viewCommentsBtn = document.getElementById("view-comments-btn") as HTMLButtonElement;
    const loader = document.getElementById("post-loader") as HTMLDivElement;
    const postTextContent = document.getElementById("post-text-content") as HTMLDivElement;

    const TOTAL_POSTS = 10;
    let currentId = 1;

    async function loadPost(id: number) {
        loader.style.display = "flex";
        postTextContent.style.visibility = "hidden";
        commentsContainer.innerHTML = "";

        try {
            const post = await fetchPost(id);
            postNumber.textContent = String(id);
            titleElement.textContent = post.title;
            bodyElement.textContent = post.body;

            prevBtn.disabled = id === 1;
            nextBtn.disabled = id === TOTAL_POSTS;
        } catch (err) {
            titleElement.textContent = "Error loading post";
            bodyElement.textContent = String(err);
        } finally {
            loader.style.display = "none";
            postTextContent.style.visibility = "visible";
        }
    }

    prevBtn.addEventListener("click", () => { if (currentId > 1) loadPost(--currentId); });
    nextBtn.addEventListener("click", () => { if (currentId < TOTAL_POSTS) loadPost(++currentId); });
    refreshBtn.addEventListener("click", () => loadPost(currentId));

    viewCommentsBtn.addEventListener("click", async () => {
        commentsContainer.innerHTML = "";
        try {
            const comments = await fetchComments(currentId);
            comments.forEach((comment: Comment) => {
                const div = document.createElement("div");
                div.innerHTML = `<strong>${comment.name}</strong><p>${comment.body}</p>`;
                commentsContainer.appendChild(div);
            });
        } catch (err) {
            commentsContainer.textContent = "Error loading comments";
        }
    });

    loadPost(currentId);
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div id="app">
    <div id="background"></div>
    <header>
        <h1>Post <span>Browser</span></h1>
    </header>
    <main id="post-container">
        <article class="card">
            <div class="post-content-wrapper">
            <span class="post-id" id="post-id-display">Post #<span id="post-number"></span> of 10</span>
            <div class="post-text-area" id="post-text-area">
                <div class="overlay-loader" id="post-loader" style="display: none;">
                <div class="loader"></div>
                </div>
                <div id="post-text-content" style="visibility: visible;">
                <h2 class="post-title" id="post-title-display"></h2>
                <p class="post-body" id="post-body-display"></p>
                </div>
            </div>
            
            <div class="actions" id="post-actions">
            <button class="btn btn-secondary" id="refresh-btn">
                <span>🔄</span> Refresh
            </button>
            <button class="btn btn-primary" id="view-comments-btn">View Comments</button>
            </div>
                <div id="comments-container"></div>
                </div>

                <div class="nav-controls" id="nav-controls">
            <button class="btn btn-secondary" id="prev-btn" disabled="">
                <span>←</span> Previous
            </button>
            <button class="btn btn-secondary" id="next-btn">
                Next <span>→</span>
            </button>
        </div>
    </article>
  </main>
  <footer>
    <p>© 2026 Post Browser</p>
  </footer>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`
