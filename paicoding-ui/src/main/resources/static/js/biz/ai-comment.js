// AI机器人评论功能扩展
// 此文件专注于AI评论相关的特殊逻辑，通用评论输入框功能已在comment-input.js中实现

$(document).ready(function () {
    $('.ai-generated-comment').each(function () {
    });
});

$(document).ready(function () {
    function getMainCommentElements() {
        return {
            $aiBotBtn: $('#aiBotBtn'),
            $aiBotDropdown: $('#aiBotDropdown'),
            $commentTextarea: $('#commentContent'),
            $commentCount: $('#commentCount'),
            $commentBtn: $('#commentBtn')
        };
    }

    function updateCommentCount() {
        const elements = getMainCommentElements();
        if (!elements.$commentTextarea.length) {
            return;
        }

        const currentValue = elements.$commentTextarea.val() || '';
        const currentLength = currentValue.length;
        const hasContent = $.trim(currentValue).length > 0;

        elements.$commentCount.text(currentLength);
        elements.$commentBtn
            .toggleClass('c-btn-disabled', !hasContent)
            .prop('disabled', !hasContent);
    }

    $(document)
        .off('click.aiCommentToggle', '#aiBotBtn')
        .on('click.aiCommentToggle', '#aiBotBtn', function (e) {
            e.stopPropagation();

            const elements = getMainCommentElements();
            if (!elements.$aiBotDropdown.length || !elements.$aiBotBtn.length) {
                return;
            }

            elements.$aiBotDropdown.toggleClass('show');
            if (!elements.$aiBotDropdown.hasClass('show')) {
                return;
            }

            const buttonRect = elements.$aiBotBtn[0].getBoundingClientRect();
            const dropdownRect = elements.$aiBotDropdown[0].getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            elements.$aiBotDropdown.css({
                top: '100%',
                bottom: 'auto'
            });

            if (buttonRect.bottom + dropdownRect.height > viewportHeight) {
                elements.$aiBotDropdown.css({
                    top: 'auto',
                    bottom: '100%'
                });
            }
        })
        .off('click.aiCommentOption', '#aiBotDropdown .ai-bot-option')
        .on('click.aiCommentOption', '#aiBotDropdown .ai-bot-option', function () {
            const elements = getMainCommentElements();
            if (!elements.$commentTextarea.length) {
                return;
            }

            const botType = $(this).data('bot');
            const botName = botType === 'hater' ? '杠精派' : '派聪明';
            const currentText = elements.$commentTextarea.val() || '';
            const tag = `@${botName} `;

            if (currentText.indexOf(tag) === -1) {
                elements.$commentTextarea.val(tag + currentText);
                updateCommentCount();
            }

            elements.$aiBotDropdown.removeClass('show');
            elements.$commentTextarea.focus();
        })
        .off('input.aiComment', '#commentContent')
        .on('input.aiComment', '#commentContent', function () {
            updateCommentCount();
        })
        .off('focus.aiComment', '#commentContent')
        .on('focus.aiComment', '#commentContent', function () {
            $(this).closest('.comment-input-container').addClass('focus');
        })
        .off('blur.aiComment', '#commentContent')
        .on('blur.aiComment', '#commentContent', function () {
            $(this).closest('.comment-input-container').removeClass('focus');
        });

    $(document)
        .off('click.aiCommentOutside')
        .on('click.aiCommentOutside', function (e) {
            if (!$(e.target).closest('#aiBotSelector').length) {
                $('#aiBotDropdown').removeClass('show');
            }
        });

    updateCommentCount();
});
