$(document).ready(function() {
    fetchQuestions();

    $('#questionForm').submit(function(e) {
        e.preventDefault();
        const question = $('#question').val();
        if (question) {
            axios.post('/api/questions', { question })
                .then(response => {
                    $('#question').val('');
                    fetchQuestions();
                })
                .catch(error => console.error(error));
        }
    });
});

function fetchQuestions() {
    axios.get('/api/questions')
        .then(response => {
            const questions = response.data;
            let questionsHTML = '';
            questions.forEach(q => {
                questionsHTML += `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${q.question}</h5>
                            <div id="replies-${q.id}">
                                ${q.replies.map(r => `<p>${r.reply}</p>`).join('')}
                            </div>
                            <form class="replyForm" data-id="${q.id}">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Your reply">
                                </div>
                                <button type="submit" class="btn btn-secondary">Reply</button>
                            </form>
                        </div>
                    </div>
                `;
            });
            $('#questions').html(questionsHTML);

            $('.replyForm').submit(function(e) {
                e.preventDefault();
                const questionId = $(this).data('id');
                const reply = $(this).find('input').val();
                if (reply) {
                    axios.post(`/api/questions/${questionId}/replies`, { reply })
                        .then(response => {
                            fetchQuestions();
                        })
                        .catch(error => console.error(error));
                }
            });
        })
        .catch(error => console.error(error));
}
