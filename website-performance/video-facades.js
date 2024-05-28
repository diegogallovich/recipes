/*
    This is a script that uses the observer API to lazy load videos from embedded iframes.

    A best practice for keeping your websites faster on first loads.

    To make use of this script, make sure your html has the following structure:

    <div id="video-facade-1" class="video-facade-container">
        <div class="video-facade-preview">
            <!-- This is the image or video that will be shown before the video is loaded -->
            <img src="path/to/preview-image.jpg" alt="Video Preview" />
        </div>
        <script>
            // The script below will go here 👇
        </script>
    </div>
*/

document.addEventListener('DOMContentLoaded', () => {
  // the intersection observer API is used to lazy load the video by checking if the video is in the viewport
  // see the threshold option at the end of the instanciaion of the observer
  // docs for intersection observer: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  let observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Directly create the iframe without altering innerHTML of the container
          const iframe = document.createElement('iframe');
          iframe.src = '<INSERT_YOUR_VIDEO_SOURCE>';
          iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write'; // optionals
          iframe.style.position = 'absolute';
          iframe.style.top = '0';
          iframe.style.left = '0';
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.title = 'title of the video';

          // Optionally wrap iframe in a div for additional styling or control
          // wrapping the iframe in a div allows you to control the size of the iframe by styling the div that wraps it
          /*
                <div id="video-facade-1" class="video-facade-container"> <!-- This div can be styled to control the size of the video -->
                    <div class="video-facade-preview">
                        <img src="path/to/preview-image.jpg" alt="Video Preview" />
                    </div>
                    <script>
                    ...
                    </script>
                </div>
            */
          const outerDiv = document.createElement('div');
          outerDiv.style.position = 'absolute';
          outerDiv.style.top = '0';
          outerDiv.style.left = '0';
          outerDiv.style.width = '100%';
          outerDiv.style.height = '100%';

          // Append the iframe to the outerDiv
          outerDiv.appendChild(iframe);

          // Append the outerDiv (containing the iframe) to the video container
          const videoContainer = document.getElementById('video-facade-1');
          videoContainer.appendChild(outerDiv);

          observer.unobserve(entry.target); // Stop observing once the iframe is inserted
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(document.getElementById('video-facade-1'));
});

/*
    After adding the script to your html, make sure to replace the placeholder '<INSERT_YOUR_VIDEO_SOURCE>' with the actual video source.

    You will end up with the following html when the script runs:

    <div id="video-facade-1" class="video-facade-container">
        <div class="video-facade-preview">
            <img src="path/to/preview-image.jpg" alt="Video Preview" />
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            <iframe src="<INSERT_YOUR_VIDEO_SOURCE>" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" title="rev-mobile-app"></iframe>
        </div>
    </div>
*/
