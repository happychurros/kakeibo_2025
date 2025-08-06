const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyQnoDQxAFbXWJmmVcZXXGM3REY4I9euQ2zAONvr_SBiQsLPkpPuTvCelKNAPjokkbd/exec';

document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const addAmountButtons = document.querySelectorAll('.add-amount-btn');
    const form = document.querySelector('form');
    const submitButton = form.querySelector('input[type="submit"]'); 

    addAmountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const valueToAdd = parseInt(this.dataset.value, 10);
            const currentValue = parseInt(amountInput.value, 10) || 0;
            amountInput.value = currentValue + valueToAdd;
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const originalButtonText = submitButton.value;
        submitButton.value = '送信中...'; 
        submitButton.disabled = true;

        const formData = new FormData(form);

        fetch(WEB_APP_URL, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('データがスプレッドシートに記録されました！');
                form.reset();
            } else {
                throw new Error('データの送信に失敗しました。');
            }
        })
        .catch(error => {
            console.error('エラー:', error);
            alert('エラーが発生しました。スプレッドシートへの記録に失敗した可能性があります。');
        })
        .finally(() => {
            submitButton.value = originalButtonText; 
            submitButton.disabled = false;
        });
    });
});