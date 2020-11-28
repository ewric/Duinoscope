/**
 * Filter data in Hamming windowed sinc filter.
 * @param {Array} data - array with samples to be filtered.
 * @param {number} M - sinc size (M must be EVEN) (M+1 is the size of sinc).
 *@param {number} sample_multiplier -  number of points to be increased in data (integer).
 * Fc is calculated as:  Fc_/1/T (normalized cutoff frequency frequency).
 * Transition band of filter is aproximated by: 4/M*(1/T).
 * M size increases transition band.
 */

function sinc_filtering_function(data, M, sample_multiplier)
{
    //M = sample_multiplier*M;
    let new_data = [];
    sample_multiplier++;
    //fill new_data with zeros and data samples.
    //We add 1 to sample_multiplier because we gonna loose M samples at the end
    //console.log(data);
    for (let i = 0 ; i < data.length*(sample_multiplier) ; i++)
    {
        new_data.push(0);
        if((i%(sample_multiplier)) === 0)
        {
            new_data[i] = data[Number(i/(sample_multiplier))];
        }
    }
    //console.log(new_data);

    let output_data = [];
    let H = [];
    // sinc points calculation
    for (let i = 0 ; i <= M*sample_multiplier ; i++)
    {
        if (i/sample_multiplier-M/2 === 0)
        {
            H[i] = 2*Math.PI*0.5;
        }
        else
        {
            H[i] = Math.sin(2*Math.PI*0.5*(i/sample_multiplier-M/2))/
            (i/sample_multiplier-M/2)*(0.54-0.46*Math.cos(2*Math.PI*i/sample_multiplier/M));
        }
        //console.log(i/sample_multiplier-M/2);
    }
    //DC of sinc = 1 (sum of all points must be 1)
    let sum = 0;
    for(let i = 0 ; i <= M*sample_multiplier ; i++)
    {
        sum += H[i];
    }
    for(let i = 0 ; i <= M*sample_multiplier ; i++)
    {
        H[i] = H[i] / (sum*1/sample_multiplier);
    }
    
    //console.log(H);
    //interpolation
    M = M*sample_multiplier;
    for(let j = M/2+1 ; j < new_data.length-(M/2+1) ; j++)
    {
        output_data.push(0);
        for(let i = 0 ; i <= M ; i++)
        {
            output_data[j - (M/2+1)] += new_data[j-(M/2)+i]*H[i];
        }
    }
    //console.log(output_data);
    return output_data;
}